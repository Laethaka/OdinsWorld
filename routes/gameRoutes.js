const router = require("express").Router();

router.get("/gamestart/:id", (req, res) => {
    let landsArr = [];
    for (let idx = 0; idx < 24; idx++) {
        landsArr.push(Math.floor(Math.random() * 5))
    }

    firebase.database().ref(`games/Game${this.state.gameId}/world`).set({
        toprow: landsArr.slice(0, 13),
        bottomrow: landsArr.slice(13, 24)
    }).then(() => {
        res.send(`okay, I'll start game num ${req.params.id}`)
    })
});

module.exports = router;
