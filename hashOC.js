function toSigned32bit(n) {
  n = n >>> 0;

  if (n >= 0x80000000) n -= 0x100000000;
  return n;
}

function hashString(data, numAt = 0) {
  for (let i = 0; i < data.length; i++) {
    const codeAt = data.charCodeAt(i);
    numAt = toSigned32bit(((numAt << 5) - numAt + codeAt) >>> 0);
  }
  return numAt;
}

let ocHash = hashString(
  '[[[null,1,0,"q5agRjZZKQjXz4hlkJq9i4BCN1beHey3f2uMaYUzaTIkD+gArgV6ZX1PgXl4KxEmDx3P7K5Wf1htLTHrwu3r+c7GfElgh5VgWcvfIPkS35hGVp6DkVhP0L/lxMuWk0w3XCdrQkb49hCxyI+SQDJYJF7liA=="],null,null,null,null,null,null,[null,0,0,"ZIJoAjvkLeSI"],null,null,null,[null,1,1,"5RoHgVhuPz1shPgC6a216tJ8f19XLVxS+s3n1KIGy2lOWSoigz8Tx9CepNnAZGt8FEJ3O+G+ypiWw7VVNUEPOj5a2bC8iYS+plBXNy8HQCHKobd7f+CccCUz9vkqHLyc2XGfrppBGSr26ycNuo2jmJebkS0PHxORI0rW"],null,[null,0,0,"g9xvjAhBWwBZbbRdtA=="],[null,0,0,"VF9U9lHYJKzixnLAWKQjUkrmP9IZms+8Y7xQmRZRM907zg2ZxbJXsEOKC0Iv1TC/DILArU2qN4MBNiPIIbT7fLiiSMlb79yI"],null,null,[null,0,0,"EYvgtQN7sF1EpC51ti0hvRZp8nqmk/iTLWvs4RC8DJ/XbbRdtA=="],[null,1,0,"QcCS0pt0qZE6DSrz5iQQrY+gb2HFjCgJHebcFgWnfpRfW715IvkP09sL9KV0in9NsXgg8wzJ0Qfqmm57SUyAZTnu9sTE/OCKZ3U6PnVfMdvwtbrp339WazA0lVEl2+a3rt/WeUxjKzFaTvXU2NCl3MtnSFwlG1VE5r3Tnpr8uGE4UBIaSjPds8m+jPCzWTRMFQdHNM6uxo+CvqtPJGQDBDsfyqi5eX20nj8fMvgkKBm6nKZ4cqOWNRVS6hgjF7yRoGVvo4YyCx3g6B4HprCYaGCPhSgADdvZDvekfblRV4V6F/sHzM8A8sOefnZLe20U6ALG8vYSknB5PUF1aAve9sXD8dmIZm9kMmtU/dTrt95Q3vCj"],null,null,null,[null,0,0,"0UwiOPz/MDoE1+u5s/PlbhUv/Q0="],null,[null,0,0,"5qy2nLWRo29zIQ3u0+veFS/9DQ=="],[null,0,0,"9rrXusOSkEo6WjlFEQ7J27dnd14="],[null,5,0,"p1slKDn6/izUoqKoPC1qfSr4BNLJ5sx7THxSSoRq6s0E1cf36YZMUUhPd18J3My82e8FrXmMEDZ4adbC2KCav9+GXGI4BUI3JLfIkZDHs185PPwfeW8H4AKKmrypPW58MQZlI7jj96yB4J4/DkP7Cy0at4umdnfUnhLWyw=="],[null,1,0,"8tmmpNfFa0VXIR1MPd6+zpyWy7pmQUoOFEs43rnJkIjKtFo2QxEHQCXLsL2Ei7utSSo9+gA1JcqksH59s5Y8GzT19zAaupuncWqolzYUKO7sJwysiJ1qbKGKKwwZ5+cQBKqFlWBal3giBRPd3Av6nX6JTU2GdBv7B9PPCe6WaXtIS4NwEej/xMj+34hfcUY/dWQE3ve/u+jWhllxMzdvVQLbEkLjoyk="],[null,0,0,"jfU4Le/g9NlitLdfVm9V7CQt2tL5xZOguznm"]]]',
);
console.log(ocHash);
