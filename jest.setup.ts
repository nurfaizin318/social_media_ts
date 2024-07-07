const jwt = require('jsonwebtoken');


// Fungsi untuk memperbarui token pada process.env
function updateEnvToken() {
  const payload = {phone_number: "085641380676" }; // Payload token
  const secret = "ini-rahasia"; // Kunci rahasia untuk menandatangani token
  const options = { expiresIn: '1h' }; // Opsi token, seperti waktu kedaluwarsa

      const token =  jwt.sign(payload, secret, { expiresIn: '1h' });
      console.log("token",token)
      process.env.TEST_TOKEN = token
      return token

}

beforeAll(() => {
  // Generate token sebelum semua tes dijalankan
  updateEnvToken();
});

afterAll(() => {
  console.log( "end token",process.env.TEST_TOKEN)
});