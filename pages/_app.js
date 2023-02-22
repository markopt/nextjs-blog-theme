import '../styles/globals.css';
import Script from 'next/script'
import 'prismjs/themes/prism-tomorrow.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
    	<Script
	    	dangerouslySetInnerHTML={{
			    __html: `
				    (function(apiKey){
	    (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
	    v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
	        o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
	        y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
	        z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
	})('d428f774-8b69-41dd-5bd1-6069e6a0fb03');
			  `,
			  }}
			  onLoad={() => {
			  	console.log('Script has loaded');
          pendo.initialize({
		        visitor: {
		            id:              'VISITOR-UNIQUE-ID'   // Required if user is logged in, default creates anonymous ID
		            // email:        // Recommended if using Pendo Feedback, or NPS Email
		            // full_name:    // Recommended if using Pendo Feedback
		            // role:         // Optional

		            // You can add any additional visitor level key-values here,
		            // as long as it's not one of the above reserved names.
		        }
          }); 
        }}
    	/>
      <span className="theme-bejamas" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
