"use strict";

test("It should capture video from xvfb", () => {
    chunk(async() => {
        await $.openUrl("https://yandex.ru");
        console.log("video will be saved to", $.getVideo({ check: false }));
    });
});
