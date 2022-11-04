import React from "react";
import {Helmet} from "react-helmet";

function DynamicHead(props){
    return(
        <Helmet>
            <meta charSet="utf-8" />
            <link rel="icon" href="/assets/images/favicon.png" />
            <title>{props.title}</title>
            <meta name="keywords" content={props.keywords} />
            <meta name="description" content={props.description} />
            <meta property="og:image" itemprop="image" content={"/assets/images/"+props.og} />
    
            <meta property="og:type" content="website" />
            <meta property="og:url" content="http://gradetuitionacademy.com/" />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" itemprop="image" content={"/assets/images/"+props.og} />
    
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://gradetuitionacademy.com/" />
            <meta property="twitter:title" content={props.title} />
            <meta property="twitter:description" content={props.description} />
            <meta property="twitter:image" itemprop="image" content={"/assets/images/"+props.og} />

            {/* <!-- Bootstrap 5.1 CSS CDN  --> */}
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />

            {/* <!-- font awesome CDN  --> */}
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous" />

            {/* <!-- React-Slick CDN  --> */}
            <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />

            {/* <!-- AOS CSS CDN   --> */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />

            {/* <!-- AOS Script  --> */}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>

            
            {/* <!-- Bootstrap 5.1 js CDN  --> */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
        </Helmet>
    );
}

export default DynamicHead;