import * as bcrypt from 'bcrypt';

async function verificar() {
  const plain = 'ClaveBlindada123';
  const hash = '$2b$10$qKHYFxlEPVLwjnJ8lNEl1ed/BbRIYqaq6IRsRsn7HcKRYDeY6n.W.';

  const match = await bcrypt.compare(plain, hash);
  console.log('¿Coincide?', match); // true o false
}

verificar();