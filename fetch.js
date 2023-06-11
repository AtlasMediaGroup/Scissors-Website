async function getContentFromWebpage(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      const content = await response.text();
      return content;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

function generateURL(version) {
    const buildNumber = 'https://ci.plex.us.org/job/Scissors/job/' + version + '/lastBuild/buildNumber';
    getContentFromWebpage(buildNumber)
        .then((content) => {
            window.location.href = 'https://ci.plex.us.org/job/Scissors/job/' + version + '/' + content + '/artifact/build/libs/scissors-' + version + '-' + content + '.jar';
        });
}