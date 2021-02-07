module.exports = {
  /** Site MetaData (Required all)*/
  title: `Sumlog`,                           // (* Required)
  description: `Front-End를 중심으로 개발에 대한 배움을 기록하는 공간입니다.`,          // (* Required)
  author: `Sumin Kim`,                         // (* Required)
  language: 'ko-KR',                        // (* Required) html lang, ex. 'en' | 'en-US' | 'ko' | 'ko-KR' | ...
  siteUrl: 'https://sumpson0-0.github.io',                      // (* Required)
    // ex.'https://junhobaik.github.io'
    // ex.'https://junhobaik.github.io/' << X, Do not enter "/" at the end.

  /** Header */
  profileImageFileName: 'profile.jpg', // include filename extension ex.'profile.jpg'
    // The Profile image file is located at path "./images/"
    // If the file does not exist, it is replaced by a random image.

  /** Home > Bio information*/
  comment: `Front-end Developer.`,
  name: 'Sumin Kim',
  company: '',
  location: 'Korea',
  email: 'sumpson00@gmail.com',
  website: 'https://sumpson0-0.github.io',           // ex.'https://junhobaik.github.io'
  linkedin: 'https://www.linkedin.com/in/sumin-kim-434279204/',                                                          // ex.'https://www.linkedin.com/in/junho-baik-16073a19ab'
  facebook: '',                                                          // ex.'https://www.facebook.com/zuck' or 'https://www.facebook.com/profile.php?id=000000000000000'
  instagram: '',                                                         // ex.'https://www.instagram.com/junhobaik'
  github: 'https://github.com/sumpson0-0',                                                            // ex.'https://github.com/junhobaik'

  /** Post */
  enablePostOfContents: true,     // TableOfContents activation (Type of Value: Boolean. Not String)
  disqusShortname: 'sumlog-1',            // comments (Disqus sort-name)
  enableSocialShare: true,        // Social share icon activation (Type of Value: Boolean. Not String)

  /** Optional */
  googleAnalytics: 'G-EKLMEEFYC2',     // Google Analytics TrackingID. ex.'UA-123456789-0'
  googleSearchConsole: 'IjGYwwMJY5D3STPoardjnLyGaAJdeZ-ecS-nvoW4AYg', // content value in HTML tag of google search console ownership verification. ex.'w-K42k14_I4ApiQKuVPbCRVV-GxlrqWxYoqO94KMbKo'
  googleAdsenseSlot: '',   // Google Adsense Slot. ex.'5214956675'
  googleAdsenseClient: 'ca-pub-1707695830238790', // Google Adsense Client. ex.'ca-pub-5001380215831339'
    // Please correct the adsense client number(ex.5001380215831339) in the './static/ads.txt' file.
};
