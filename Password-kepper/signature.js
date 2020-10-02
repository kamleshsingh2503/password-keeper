const signature = () => {
    crypto.sign("sha256", Buffer.from("xyz"), {
	key: privateKey,
	padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
 })
}

console.log(signature.toString("base64"));