
import { Prefetcher } from '@layer0/prefetch/sw'
import DeepFetchPlugin from "@layer0/prefetch/sw/DeepFetchPlugin";

skipWaiting()
clientsClaim()
precacheAndRoute(self.__WB_MANIFEST || [])

new Prefetcher({
    plugins: [

        new DeepFetchPlugin([
            // Deep fetch all images on page
            {
                selector: 'img', // CSS selector syntax - just like you would use with document.querySelector()
                maxMatches: 100, // limits the number of matched elements to prefetch to 1 per page
                attribute: 'src', // the attribute holding the URL to prefetching
                as: 'image', // the type of asset being prefetched
            }
        ])
    ]
}).route()