import mongoose from 'mongoose';

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        default: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAogMBIgACEQEDEQH/xAAaAAEBAAMBAQAAAAAAAAAAAAAAAwECBAUH/8QAKxABAAICAAUDAwMFAAAAAAAAAAECAxEEEiExUTJBcSJhgROxwRQzQpGi/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7iAAAAAAAAAAAAAAAAAAAAAAAAAAAANLZNdI6pzMz3BWb18sfqR90gFP1I8MxkqkAvExPZlz7b1ya9QKjETuGQAAAAAAAAAAEr330jszktrpCYAAAHbv0+QBjceYZAABmtprK0TExuEG1LanXsCwAAAAAAADEzqNstMs/SCUzudgAA1vblpa3iASz5uSeWupn9nLNrWndpmfkmdzMsAdlsWeazEXndfPhEUel37CHCW3SY8LoAAK453Hw3RxzqywAAAAAACWXvCqWX1A0AATz/wBm/wAKNclealq+YB54T0mY8CoAA6OD72+HUhwlfpm3ldFAAI7w6HO6AAAAAAAE8sdlGuSN1BEAAGJmIjczER9wQz4ZtPNSOvvDmmJidTGnZPEY4/y38Q1nPinvG/mAci2LBN5ibRMVUjNgjtX/AJbf1OP3mf8AQKxERGo7MtaXrf0zEtgAAZrG7QulijrtUAAAAAAAAELxyz9mFrV5oRmNdJBplyRjrue/tHlxXva87tO/4b8TabZZ8R0hIABUAAHVw+bm+m/q9p8uVmJmJ3HcV6J36NaW5qxbzC2OvvKDescsRDIAAAAAAAAANbViWwDyc1LUyTzx36pvYvSt45bRuHJl4L3xW/FgcQrbh8te9J/HVLr7woA3rjvf00tP4BoREzOojcurHwV7euYrHj3deLBTF6Y6+ZQa8NimuKsXjUwuAAAAAAAAAAAAAAADGmQGNQaZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Z"
    } 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;