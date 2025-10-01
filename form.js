document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form_box form');
  const errorMsg = document.createElement('div');
  errorMsg.className = 'form-error-msg';
  errorMsg.style.display = 'none';
  errorMsg.setAttribute('role', 'alert');
  errorMsg.textContent = 'Erro ao enviar os dados. Por favor, tente novamente.';
  form.parentNode.insertBefore(errorMsg, form);

  const successMsg = document.createElement('div');
  successMsg.className = 'form-success-msg';
  successMsg.style.display = 'none';
  successMsg.setAttribute('role', 'status');
  successMsg.textContent = 'Dados enviados com sucesso!';
  form.parentNode.insertBefore(successMsg, form);

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erro');
      form.reset();
      successMsg.style.display = 'block';
    } catch (error) {
      errorMsg.style.display = 'block';
    }
  });
});