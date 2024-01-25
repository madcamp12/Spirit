// DummyShowcases.js
export const dummyShowcases = [
    {
        _id: "post1",
        caption: "Cotton Elegance",
        likes: [
            { _id: "user2", username: "user2name", avatar: "https://via.placeholder.com/150" }
        ],
        comments: [],
        image: "https://cdn-pro-web-208-246.cdn-nhncommerce.com/whitecotton5_godomall_com/data/goods/21/11/44//1000006669/modify_detail_059.jpg",
        postedBy: { _id: "user2", username: "0_forever", avatar: "https://via.placeholder.com/150" },
        savedBy: ["user1"],
        createdAt: "2021-01-02T00:00:00Z"
    },
    {
        _id: "post2",
        caption: "Neon Nightscape",
        likes: [
            { _id: "user1", username: "user1name", avatar: "https://via.placeholder.com/150" },
            { _id: "user2", username: "user2name", avatar: "https://via.placeholder.com/150" }
        ],
        comments: [
            { _id: "comment1", user: { username: "user3", avatar: "https://via.placeholder.com/150" }, comment: "Amazing view!" },
            { _id: "comment2", user: { username: "user4", avatar: "https://via.placeholder.com/150" }, comment: "I love this place!" }
        ],
        image: "https://s1.best-wallpaper.net/wallpaper/m/1712/Shinjuku-Tokyo-Japan-city-night-signboard_m.jpg",
        postedBy: { _id: "user1", username: "_donngha", avatar: "https://via.placeholder.com/150" },
        savedBy: ["user5", "user6"],
        createdAt: "2021-01-01T00:00:00Z"
    },
    {
        _id: "post3",
        caption: "Beautiful landscape",
        likes: [
            { _id: "user1", username: "user1name", avatar: "https://via.placeholder.com/150" },
            { _id: "user2", username: "user2name", avatar: "https://via.placeholder.com/150" }
        ],
        comments: [
            { _id: "comment1", user: { username: "user3", avatar: "https://via.placeholder.com/150" }, comment: "Amazing view!" },
            { _id: "comment2", user: { username: "user4", avatar: "https://via.placeholder.com/150" }, comment: "I love this place!" }
        ],
        image: "https://madcamp.dhki.kr/images/dongha.jpg",
        postedBy: { _id: "user1", username: "user1name", avatar: "https://via.placeholder.com/150" },
        savedBy: ["user5", "user6"],
        createdAt: "2021-01-01T00:00:00Z"
    },
    {
        _id: "post4",
        caption: "City lights at night",
        likes: [
            { _id: "user2", username: "user2name", avatar: "https://via.placeholder.com/150" }
        ],
        comments: [],
        image: "https://via.placeholder.com/500",
        postedBy: { _id: "user2", username: "user2name", avatar: "https://via.placeholder.com/150" },
        savedBy: ["user1"],
        createdAt: "2021-01-02T00:00:00Z"
    },
    {
        _id: "post5",
        caption: "Beautiful landscape",
        likes: [
            { _id: "user1", username: "user1name", avatar: "https://via.placeholder.com/150" },
            { _id: "user2", username: "user2name", avatar: "https://via.placeholder.com/150" }
        ],
        comments: [
            { _id: "comment1", user: { username: "user3", avatar: "https://via.placeholder.com/150" }, comment: "Amazing view!" },
            { _id: "comment2", user: { username: "user4", avatar: "https://via.placeholder.com/150" }, comment: "I love this place!" }
        ],
        image: "https://via.placeholder.com/500",
        postedBy: { _id: "user1", username: "user1name", avatar: "https://via.placeholder.com/150" },
        savedBy: ["user5", "user6"],
        createdAt: "2021-01-01T00:00:00Z"
    },
    {
        _id: "post6",
        caption: "City lights at night",
        likes: [
            { _id: "user2", username: "user2name", avatar: "https://via.placeholder.com/150" }
        ],
        comments: [],
        image: "https://via.placeholder.com/500",
        postedBy: { _id: "user2", username: "user2name", avatar: "https://via.placeholder.com/150" },
        savedBy: ["user1"],
        createdAt: "2021-01-02T00:00:00Z"
    }
];

export default dummyShowcases;
