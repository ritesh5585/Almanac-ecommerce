const errorHandler = (err, req, res, next) => {
    console.log("Error name: ", err.name);
    console.log("Error message: ", err.message);
    console.log("Error stack: ", err.stack);
    if (err.name === "CastError") {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(500).json({ message: err.message });
};
export default errorHandler;
