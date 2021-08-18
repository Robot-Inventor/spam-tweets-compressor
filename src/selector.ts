interface media_selector {
    [key: string]: string,
    image: string,
    video: string,
    summary_card: string,
    summary_with_large_image: string
}

function generate_media_selector() {
    const media_selector: media_selector = {
        image: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
        video: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x",
        summary_card: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-18u37iz.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
        summary_with_large_image: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg"
    };

    let merged = "";
    Object.keys(media_selector).forEach((key) => {
        merged += "," + media_selector[key];
    });
    merged = merged.replace(/^,/, "");

    return merged;
}

export const selector = {
    tweet_outer: "div.css-1dbjc4n.r-1adg3ll.r-1ny4l3l",
    tweet_content: ".css-901oao.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0",
    user_name: ".css-901oao.css-bfa6kz.r-1awozwy.r-6koalj.r-1tl8opc.r-a023e6.r-b88u0q.r-rjixqe.r-bcqeeo.r-1udh08x.r-3s2u2q.r-qvutc0",
    user_id: ".css-901oao.css-bfa6kz.r-18u37iz.r-16dba41.r-bcqeeo.r-qvutc0",
    timeline: "main",
    checked_tweet_class_name: "spam-tweets-compressor-checked",
    media: generate_media_selector(),
    verified_badge: "svg.r-4qtqp9.r-yyyyoo.r-1xvli5t.r-9cviqr.r-f9ja8p.r-og9te1.r-bnwqim.r-1plcrui.r-lrvibr",
    hashtag_link_mention: ".css-4rbku5.css-18t94o4.css-901oao.css-16my406.r-1loqt21.r-poiln3.r-bcqeeo.r-qvutc0",
    link_scheme_outer: ".css-901oao.css-16my406.r-1tl8opc.r-hiw28u.r-qvk6io.r-bcqeeo.r-qvutc0",
    tweet_button_inner: ".css-4rbku5.css-18t94o4.css-1dbjc4n.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-1waj6vr.r-1loqt21.r-19yznuf.r-64el8z.r-1ny4l3l.r-o7ynqc.r-6416eg.r-lrvibr",
    normal_text: ".css-901oao.css-16my406.r-1tl8opc.r-bcqeeo.r-qvutc0",
    show_tweet_button: ".show-tweet-button"
};
