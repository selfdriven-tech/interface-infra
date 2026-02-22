exports.handler = async (event) => {
	console.log("Event received:", event);
	return {
		statusCode: 200,
		body: "Hello from Lambda!",
	};
};