interface media_selector {
    image: string;
    video: string;
    summary_card: string;
    summary_with_large_image: string;
}

const generate_media_selector = () => {
    const selector: media_selector = {
        image: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
        summary_card: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-18u37iz.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
        summary_with_large_image: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
        video: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x"
    } as const;

    return Object.values(selector).join(",");
};

export const selector = {
    checked_tweet_class_name: "spam-tweets-compressor-checked",
    hashtag_link_mention: ".css-4rbku5.css-18t94o4.css-901oao.css-16my406.r-1loqt21.r-poiln3.r-bcqeeo.r-qvutc0",
    link_scheme_outer: ".css-901oao.css-16my406.r-1tl8opc.r-hiw28u.r-qvk6io.r-bcqeeo.r-qvutc0",
    media: generate_media_selector(),
    normal_text: ".css-901oao.css-16my406.r-1tl8opc.r-bcqeeo.r-qvutc0",
    show_tweet_button: ".show-tweet-button",
    timeline: "main",
    tweet_button_inner:
        ".css-4rbku5.css-18t94o4.css-1dbjc4n.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-1waj6vr.r-1loqt21.r-19yznuf.r-64el8z.r-1ny4l3l.r-o7ynqc.r-6416eg.r-lrvibr",
    tweet_content: ".css-901oao.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0",
    tweet_outer: "div.css-1dbjc4n.r-1adg3ll.r-1ny4l3l",
    user_id: ".css-901oao.css-bfa6kz.r-18u37iz.r-16dba41.r-bcqeeo.r-qvutc0",
    user_name:
        ".css-901oao.css-bfa6kz.r-1awozwy.r-6koalj.r-1tl8opc.r-a023e6.r-b88u0q.r-rjixqe.r-bcqeeo.r-1udh08x.r-3s2u2q.r-qvutc0",
    verified_badge: "svg.r-4qtqp9.r-yyyyoo.r-1xvli5t.r-9cviqr.r-f9ja8p.r-og9te1.r-bnwqim.r-1plcrui.r-lrvibr"
} as const;
