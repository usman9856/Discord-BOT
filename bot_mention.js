// // authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// /**
 // * An HTTP endpoint that acts as a webhook for Discord message.create event
 // * @param {object} event
 // * @returns {any} result
 // */
module.exports = async (event, context) => {

let result = {crawler: {}};
  
  console.log(`Running [Crawler → Query (scrape) a provided URL based on CSS selectors]...`);
  result.crawler.pageData = await lib.crawler.query['@0.0.1'].selectors({
    url: `https://localhackday.mlh.io/`,
    userAgent: `stdlib/crawler/query`,
    includeMetadata: false,
 selectorQueries: [
    {
      'selector': `.learn-sect-3-indi .w-dyn-items`,
      'resolver': `text`
    }
    ]
  });  
  
  let dates = ["","Sunday March 28","Monday March 29","Tuesday March 30","Wednesday March 31","Thursday April 1","Friday April 2",
  "Saturday April 3","Sunday April 4","Monday April 5"]
  
  let searchWord = event.content.toLowerCase(); 
  
  let requested_date = 0
  if(searchWord.includes("play")){
    let song_name= searchWord.split('play');
    let messageResponse = await lib.discord.channels['@0.0.2'].messages.create({
      channel_id: `${event.channel_id}`,
      content:`Playing ${song_name[1]}`
    });
    
    return messageResponse;
  }else if(searchWord.includes("march 28")){
    requested_date = 1
  } else if(searchWord.includes("march 29")){
    requested_date = 2
  }else if(searchWord.includes("march 30")){
    requested_date = 3
  }else if(searchWord.includes("march 31")){
    requested_date = 4
  }else if(searchWord.includes("april 1")){
    requested_date = 5
  }else if(searchWord.includes("april 2")){
    requested_date = 6
  }else if(searchWord.includes("april 3")){
    requested_date = 7
  }else if(searchWord.includes("april 4")){
    requested_date = 8
  }else if(searchWord.includes("april 5")){
    requested_date = 9
  }else{
    requested_date = 0
  }
  
  console.log(result.crawler.pageData.queryResults[0])
  let yeet = result.crawler.pageData.queryResults[0][requested_date].text.replace(/ET/g, " ET - ")
  let test = yeet.split(/(\d{1,2}:\d{2} [^0-9]+)/g)
  test.unshift(`:star::shark: Upcoming events on ${dates[requested_date]} :shark::star2:**`)
  console.log(test)

  let messageResponse = await lib.discord.channels['@0.0.2'].messages.create({
    channel_id: `${event.channel_id}`,
    content: test.join('\n')
  });

  return messageResponse;

}
