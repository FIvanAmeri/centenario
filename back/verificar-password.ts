import * as bcrypt from 'bcrypt';

async function verificar() {
  const plain = '123456';
  const hash = '$2b$10$wE9sY6Z1N7iE2k4EwF7/vO.oXv1h.00.L9oT8j5qA3g5h/r9.e3u';

  const match = await bcrypt.compare(plain, hash);
  console.log('¿Coincide?', match); 
}

verificar();