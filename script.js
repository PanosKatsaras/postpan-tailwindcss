import axios from "axios";
import prettyBytes from "pretty-bytes";
import setupEditors from "./setupEditor";

const form = document.querySelector("[data-form]");
const queryParamsContainer = document.querySelector("[data-query-params]");
const requestHeadersContainer = document.querySelector("[data-request-headers]");
const keyValueTemplate = document.querySelector("[data-key-value-template]");
const responseHeadersContainer = document.querySelector("[data-response-headers]");
const urlInput = document.querySelector("[data-url]");

document.querySelector("[data-add-query-param-btn]").addEventListener("click", () => {
  queryParamsContainer.append(createKeyValuePair());
});

document.querySelector("[data-add-request-header-btn]").addEventListener("click", () => {
  requestHeadersContainer.append(createKeyValuePair());
});

// Initialize with one pair
queryParamsContainer.append(createKeyValuePair());
requestHeadersContainer.append(createKeyValuePair());

// Tabs for switching between different sections
const tabButtons = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(tabButton => {
  tabButton.addEventListener("click", () => {
    // Remove active class from all tabs
    tabButtons.forEach(button => {
      button.classList.remove("text-blue-500", "border-blue-500");
      button.classList.add("text-gray-500");
    });
    // Hide all tab contents
    tabContents.forEach(content => content.classList.add("hidden"));
    // Add active class to clicked tab and show the corresponding content
    tabButton.classList.add("text-blue-500", "border-blue-500");
    tabButton.classList.remove("text-gray-500");

    const targetId = tabButton.getAttribute("data-tab-target");
    document.querySelector(targetId).classList.remove("hidden");
  });
});

// Interceptors to track request and response times
axios.interceptors.request.use(request => {
  request.customData = request.customData || {};
  request.customData.startTime = new Date().getTime();
  return request;
});

function updateEndTime(response) {
  response.customData = response.customData || {};
  response.customData.time = new Date().getTime() - response.config.customData.startTime;
  return response;
}

axios.interceptors.response.use(updateEndTime, e => {
  return Promise.reject(updateEndTime(e.response));
});

const { requestEditor, updateResponseEditor } = setupEditors();

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission behavior (page reload)

  console.log("Form submission intercepted!");

  const urlValue = urlInput.value;  // Get the URL input value

  // Ensure that URL value is retained
  urlInput.value = urlValue;  // Explicitly set the value of the URL input here

  let data;
  try {
    data = JSON.parse(requestEditor.state.doc.toString() || null);
  } catch (e) {
    alert("JSON data is malformed. Please check your input.");
    return;
  }

  // Send request
  axios({
    url: urlValue,
    method: document.querySelector("[data-method]").value,
    params: keyValuePairsToObjects(queryParamsContainer),
    headers: keyValuePairsToObjects(requestHeadersContainer),
    data,
  })
    .catch((e) => {
      console.error("Request failed:", e);
      alert("An error occurred: " + (e.message || e));
    })
    .then((response) => {
      // Ensure the URL input field stays intact after the request
      urlInput.value = urlValue; // Ensure the URL input value stays the same

      // Show the response section
      document.querySelector("[data-response-section]");

      // Update response details and editor
      updateResponseDetails(response);
      updateResponseEditor(response.data);
      updateResponseHeaders(response.headers);
      console.log("Response:", response);
    });
});

function updateResponseDetails(response) {
  document.querySelector("[data-status]").textContent = response.status;
  document.querySelector("[data-time]").textContent = response.customData.time;
  document.querySelector("[data-size]").textContent = prettyBytes(
    JSON.stringify(response.data).length + JSON.stringify(response.headers).length
  );
}

function updateResponseHeaders(headers) {
  responseHeadersContainer.innerHTML = "";
  Object.entries(headers).forEach(([key, value]) => {
    const div = document.createElement("div");
    div.classList.add("mb-2"); // Add spacing between items
    const keyElement = document.createElement("strong");
    keyElement.textContent = key;
    const valueElement = document.createElement("span");
    valueElement.textContent = value;
    div.append(keyElement, ": ", valueElement);
    responseHeadersContainer.append(div);
  });
}

function createKeyValuePair() {
  const element = keyValueTemplate.content.cloneNode(true);
  element.querySelector("[data-remove-btn]").addEventListener("click", (e) => {
    e.target.closest("[data-key-value-pair]").remove();
  });
  return element;
}

function keyValuePairsToObjects(container) {
  const pairs = container.querySelectorAll("[data-key-value-pair]");
  return [...pairs].reduce((data, pair) => {
    const key = pair.querySelector("[data-key]").value;
    const value = pair.querySelector("[data-value]").value;

    if (key === "") return data;
    return { ...data, [key]: value };
  }, {});
}

// Add tab click handlers
document.querySelectorAll("[data-tab-target]").forEach(tab => {
  tab.addEventListener("click", () => {
    // Remove active styles from all tabs
    document.querySelectorAll("[data-tab-target]").forEach(t => {
      t.classList.remove("text-orange-600", "border-orange-600");
      t.classList.add("text-gray-500");
    });
    // Add active styles to clicked tab
    tab.classList.remove("text-gray-500");
    tab.classList.add("text-orange-600", "border-b-2", "border-orange-600");
  });
});

