// const cookies = [
//     "NEXT_LOCALE=es",
//     "_ga=GA1.1.702465169.1767009535",
//     "_clck=1z081z6%5E2%5Eg29%5E0%5E2189",
//     "twk_idm_key=de9YFOinMWneoYlFhCUKu",
//     "_ga_ZLYCL8WM6K=GS2.1.s1767013844$o2$g0$t1767013844$j60$l0$h0",
//     "_clsk=12qz2pw%5E1767013849000%5E1%5E1%5Eq.clarity.ms%2Fcollect",
//     "TawkConnectionTime=0",
//     "twk_uuid_66cea58aea492f34bc0ad19d=%7B%22uuid%22%3A%221.Ws47qyK8QPCl1i0gUZiYHfs1hNRQfodM5wU3CkNJU37JvGKDS7XBnUzBlYH2TcsJK7SX1YxNfjagfyNNxcQfAHRWSmZ9HEWwVMoUtBoM9TFZQCi3BCOyh59SR%22%2C%22version%22%3A3%2C%22domain%22%3A%22nextcaptcha.com%22%2C%22ts%22%3A1767013849266%7D"
// ];

const cookies = document.cookie.split("; ");

let final_value = [];
let prev_max_value = 0;
let prev_min_value = 0;
let final_sum_value = 0;

const extractLongestIds = function(B) {
    const J = /\b(1[2-9]\d{8}(\d{3})?)\b/g;

    const matches = [];
    let match;

    while ((match = J.exec(B)) !== null) {
        matches.push(match[1]);
    }

    if (matches.length === 0) {
        return [];
    }

    const maxLen = Math.max(...matches.map(m => m.length));

    const filtered = matches.filter(m => m.length === maxLen);

    return filtered.map(m => parseInt(m.slice(1, 6), 10));
}

for (const cookie of cookies) {
    const ids = extractLongestIds(cookie);

    if (ids.length !== 0) {
        for (const longid of ids) {
            if (final_value.length === 0) {
                final_value.push(0, 0, 0, 0);
            }

            if (prev_min_value === 0) {
                prev_min_value = longid;
            }

            final_value[0] += 1;
            final_value[2] = Math.max(prev_max_value, longid);
            final_value[1] = Math.min(prev_min_value, longid);
            final_value[3] = final_sum_value + longid;

            final_sum_value = final_value[3];
            prev_max_value = longid;
        }
    }
}

if (final_value.length !== 0) {
    final_value[3] = Math.floor(final_value[3] / final_value[0]);
}

console.log(final_value);
