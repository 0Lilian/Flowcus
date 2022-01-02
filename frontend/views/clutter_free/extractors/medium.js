// This is a custom extractor for all Medium powered websites.

(function () {

    // Some medium powered websites don't have a *.medium.com domain name (example : towardsdatascience.com), so this array will be used to
    // list all these Medium websites to force Medium extractor on these websites.
    additional_medium_websites = [
        "towardsdatascience.com"
    ]

    // Parse the body to extract the clutter-free content.
    const customExtractor = {
      domain: 'medium.com',

      title: {
        selectors: ['h1', ['meta[name="og:title"]', 'value']],
      },

      author: {
        selectors: [['meta[name="author"]', 'value']],
      },

      content: {
        selectors: ['article'],

        transforms: {

          // Re-write lazy-loaded youtube videos
          iframe: $node => {
            const ytRe = /https:\/\/i.embed.ly\/.+url=https:\/\/i\.ytimg\.com\/vi\/(\w+)\//;
            const thumb = decodeURIComponent($node.attr('data-thumbnail'));
            const $parent = $node.parents('figure');

            if (ytRe.test(thumb)) {
              const [_, youtubeId] = thumb.match(ytRe); // eslint-disable-line
              $node.attr('src', `https://www.youtube.com/embed/${youtubeId}`);
              const $caption = $parent.find('figcaption');
              $parent.empty().append([$node, $caption]);
              return;
            }

            // If we can't draw the YouTube preview, remove the figure.
            $parent.remove();
          },

          // rewrite figures to pull out image and caption, remove rest
          figure: $node => {
            // ignore if figure has an iframe
            if ($node.find('iframe').length > 0) return;

            const $img = $node.find('img').slice(-1)[0];
            const $caption = $node.find('figcaption');

            $node.empty().append([$img, $caption]);
          },

          // Remove any smaller images that did not get caught by the generic image
          // cleaner (author photo 48px, leading sentence images 79px, etc.).
          img: $node => {
            const width = parseInt($node.attr('width'), 10);
            if (width < 100) $node.remove();
          },
        },

        clean: ['span:not(pre > span)', 'svg'],
      },

      date_published: {
        selectors: [['meta[name="article:published_time"]', 'value']],
      },

      lead_image_url: {
        selectors: [['meta[name="og:image"]', 'value']],
      },

      dek: null,

      next_page_url: {
        selectors: [
          // enter selectors
        ],
      },

      excerpt: {
        selectors: [
          // enter selectors
        ],
      },
    };

    // Add dynamic extractor's domain.
    if (additional_medium_websites.includes(window.location.hostname)) {
        customExtractor.domain = window.location.hostname;
    }

    // Set and return the Mercury extractor.
    return Mercury.addExtractor(customExtractor);
})();
