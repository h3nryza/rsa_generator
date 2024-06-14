document.getElementById('generateButton').addEventListener('click', function() {
  console.log('Generate Keys button clicked');
  generateKeys();
});

function generateKeys() {
  const keySize = parseInt(document.getElementById('keySize').value, 10);
  logDebug(`Selected key size: ${keySize}`);

  try {
      const { pki } = forge;
      const keypair = pki.rsa.generateKeyPair(keySize);
      const publicKeyPem = pki.publicKeyToPem(keypair.publicKey);
      const privateKeyPem = pki.privateKeyToPem(keypair.privateKey);

      document.getElementById('publicKey').value = publicKeyPem;
      document.getElementById('privateKey').value = privateKeyPem;

      logInfo('RSA keys generated successfully.');
  } catch (error) {
      logError('Error generating RSA keys: ', error);
      alert('An error occurred while generating the keys. Please try again.');
  }
}

function copyToClipboard(elementId) {
  try {
      const copyText = document.getElementById(elementId);
      copyText.select();
      document.execCommand('copy');
      alert('Copied the text: ' + copyText.value);
      logInfo(`Copied ${elementId} to clipboard.`);
  } catch (error) {
      logError('Error copying to clipboard: ', error);
      alert('An error occurred while copying. Please try again.');
  }
}

function downloadKey(elementId, filename) {
  try {
      const element = document.createElement('a');
      const key = document.getElementById(elementId).value;
      const blob = new Blob([key], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      element.href = url;
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      logInfo(`Downloaded ${filename}.`);
  } catch (error) {
      logError('Error downloading key: ', error);
      alert('An error occurred while downloading the key. Please try again.');
  }
}

function logInfo(message) {
  console.log(`INFO: ${message}`);
  logToPage(`INFO: ${message}`);
}

function logError(message, error) {
  console.error(`ERROR: ${message}`, error);
  logToPage(`ERROR: ${message} ${error.message}`);
}

function logDebug(message) {
  console.debug(`DEBUG: ${message}`);
  logToPage(`DEBUG: ${message}`);
}

function logToPage(message) {
  const logContainer = document.getElementById('log');
  const logMessage = document.createElement('div');
  logMessage.textContent = message;
  logContainer.appendChild(logMessage);
}
