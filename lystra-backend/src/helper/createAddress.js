import Address from "../models/addressModel.js";
const createAddress = async (address) => {
    const { location, line1, line2, state, city, country, landMark, pinCode } = address;

    const newAddress = new Address({ location, line1, line2, state, city, country, landMark, pinCode })
    await newAddress.save();

    return newAddress._id;
}
export default createAddress;