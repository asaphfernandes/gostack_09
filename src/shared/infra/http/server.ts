import app from './app';

app.listen(3333, () => {
  const started = new Date().toLocaleTimeString();
  console.log('Desafio 09: Relacionamentos com banco de dados no Node.js - Asaph Fernandes');
  console.log(`Serve started in port 3333 at ${started}`);
});
