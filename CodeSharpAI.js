const codeSnippets = {
    html: [
        "<h1>Hello from HTML!</h1>",
        "<button>Click Me</button>",
        "<input type='text' placeholder='Enter your name'>",
        "<div style='color:red;'>Styled Div</div>"
    ],
    css: [
        "body { background-color: lightblue; }",
        "h1 { font-size: 48px; color: green; }",
        "button { padding: 10px; background-color: orange; }",
        "div { margin: 20px; padding: 20px; border: 1px solid black; }"
    ],
    javascript: [
        "console.log('Hello from JavaScript!');",
        "alert('Welcome to CodeSharp AI!');",
        "document.body.style.backgroundColor = 'yellow';",
        "document.querySelector('h1').innerText = 'New Header!';"
    ],
    python: [
        "print('Hello from Python!')",
        "for i in range(5): print(i)",
        "name = input('What is your name? '); print(f'Hello {name}')",
        "def greet(): print('Hello!'); greet()"
    ]
};

function switchLanguage() {
    const language = document.getElementById("languageSelect").value;
    const exampleSelect = document.getElementById("exampleSelect");
    exampleSelect.innerHTML = "";
    codeSnippets[language].forEach((snippet, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `Example ${index + 1}`;
        exampleSelect.appendChild(option);
    });
}

function generateCode() {
    const language = document.getElementById("languageSelect").value;
    const exampleIndex = document.getElementById("exampleSelect").value;
    const code = codeSnippets[language][exampleIndex];
    document.getElementById("codeInput").value = code;
}

function runCode() {
    const code = document.getElementById("codeInput").value;
    const iframe = document.getElementById("outputFrame").contentWindow.document;
    iframe.open();
    iframe.write(code);
    iframe.close();
}

function saveCode() {
    const code = document.getElementById("codeInput").value;
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "code.txt";
    link.click();
}

function clearCode() {
    document.getElementById("codeInput").value = "";
}

function startVoiceCommand() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = function (event) {
        const command = event.results[0][0].transcript;
        document.getElementById("codeInput").value += `\n// Voice Command: ${command}`;
    };
    recognition.start();
}

// Initialize the language switcher on page load
window.onload = switchLanguage;
