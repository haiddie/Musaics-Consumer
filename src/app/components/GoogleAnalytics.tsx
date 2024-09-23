import Script from 'next/script';

const GoogleAnalytics = () => {
    const hostname = process.env.NEXT_HOST_NAME
    return (
        <>

            <Script async src={`https://www.googletagmanager.com/gtag/js?id=G-C21ZTGRHE1`} />
            <Script id="google-analytics" strategy='lazyOnload'>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-C21ZTGRHE1');
              `}
            </Script>


            <Script async src={`https://www.googletagmanager.com/gtag/js?id=G-ZHFZ22Q21Z`} />
            <Script id="google-analytics" strategy='lazyOnload'>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-ZHFZ22Q21Z');
              `}
            </Script>


        </>
    );



};

export default GoogleAnalytics;
