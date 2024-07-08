import jwt from "jsonwebtoken"


// Fungsi untuk memperbarui token pada process.env
function updateEnvToken() {
  const payload = { phone_number: "085641380676" }; // Payload token
  const secret = "ini-rahasia"; // Kunci rahasia untuk menandatangani token

  const token = jwt.sign({phone_number:"085641380676"}, secret, { expiresIn: '1d' });
  process.env.TEST_TOKEN = token
  return token

}

beforeAll(() => {
  // Generate token sebelum semua tes dijalankan
  updateEnvToken();

});

afterAll(() => {
  // console.log("end token", process.env.TEST_TOKEN)
});