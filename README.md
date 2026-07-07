# LeetLens - AI Test Case Generator for LeetCode

LeetLens is a Chrome Extension that enhances the LeetCode problem-solving experience by automatically analyzing a problem and generating high-quality AI-powered test cases using Google's Gemini API.

Instead of manually thinking of edge cases, LeetLens extracts the problem details, understands the function signature, and generates diverse, valid test cases that satisfy all problem constraints.

---

# Features

##  Automatic Problem Analysis

- Extracts the problem title
- Reads the complete problem description
- Extracts all constraints
- Reads examples from the problem statement

---


## Copy Test Cases

Each testcase includes a **Copy** button.

One click copies the input in LeetCode format.

---


## User-owned Gemini API

LeetLens never stores or ships with an API key.

Each user enters their own Gemini API key through the Settings page.

The key is securely stored using Chrome Storage.

---

# Tech Stack

- JavaScript (ES6)
- Chrome Extension Manifest V3
- Chrome Storage API
- Chrome Tabs API
- Mutation Observer
- LeetCode GraphQL API
- Google Gemini API

---


# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/mercyarulappan/LeetLens.git
```

---

## 2. Open Chrome Extensions

```
chrome://extensions
```

---

## 3. Enable Developer Mode

Toggle

```
Developer Mode
```

---

## 4. Load Extension

Click

```
Load unpacked
```

Select the

```
LeetLens
```

folder.

---

# 🔑 Setting up Gemini API

LeetLens requires a Gemini API key.

## Step 1

Open the extension.

Go to

```
Settings
```

---

## Step 2

Create a Gemini API key from Google AI Studio.

---

## Step 3

Copy the generated API key.

Example

```
AIzaSy***************
```

---

## Step 4

Paste it into

```
Gemini API Key
```

Click

```
Save
```

The key is stored locally using

```
chrome.storage.local
```
---


#  Support

If you found this project useful, consider giving it a ⭐ on GitHub!
