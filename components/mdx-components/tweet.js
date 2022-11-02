import TweetEmbed from 'react-tweet-embed'

export const Tweet = ({ tweetId }) => {
  console.log(tweetId);

  return (

    < TweetEmbed tweetId={`${tweetId}`} options={{ align: 'center' }} />
  );
};

