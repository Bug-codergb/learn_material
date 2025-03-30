console.log(1)
import axios from "axios"
const formData = {
  userName:"guobin",
  password:"123"
}
axios.post("/api/login",{
  ...formData
})