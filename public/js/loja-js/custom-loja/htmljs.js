function collectionSliders() {
    document
        .querySelectorAll(".collection-slider")
        .forEach(slider => {
            new Glide(slider, {
                    autoplay: 2000,
                    type: "carousel",
                    perView: 3,
                    gap: 30,
                    breakpoints: {
                        1440: {
                            perView: 2,
                        },
                        1024: {
                            perView: 1,
                        },
                    },
                })
                .mount();
        });
}

function productSlider() {
    document
        .querySelectorAll(".product-slider")
        .forEach(slider => {
            new Glide(slider, {
                    type: "carousel",
                    startAt: 1,
                    perView: 4,
                    gap: 0,
                    peek: {
                        before: 50,
                        after: 50,
                    },
                    breakpoints: {
                        1024: {
                            perView: 3,
                            peek: {
                                before: 20,
                                after: 20,
                            },
                        },
                        768: {
                            perView: 2,
                            peek: {
                                before: 10,
                                after: 10,
                            },
                        },
                        600: {
                            perView: 1,
                            peek: {
                                before: 0,
                                after: 0,
                            },
                        },
                    },
                })
                .mount();
        });
}

function postSlider() {
    new Glide(".posts-slider", {
            type: "carousel",
            startAt: 1,
            perView: 3,
            gap: 0,
            peek: {
                before: 50,
                after: 50,
            },
            breakpoints: {
                1024: {
                    perView: 3,
                    peek: {
                        before: 20,
                        after: 20,
                    },
                },
                768: {
                    perView: 2,
                    peek: {
                        before: 10,
                        after: 10,
                    },
                },
                600: {
                    perView: 1,
                    peek: {
                        before: 0,
                        after: 0,
                    },
                },
            },
        })
        .mount();
}
;