export default {
    matchFullText: (term = '', fromText = ''): boolean => {
        let result = false

        if (!fromText) return result;

        result = true;

        if (fromText && term.length) {
            const queries = term.split(' ')
            const source = fromText.toLowerCase();
            result = queries.every(query => source.indexOf(query.toLowerCase()) > -1);
        }

        return result;
    },
    random(candidates = '', length = 0) {
        let result = '';
        let arrCandidates = candidates.split('');
        const candidateCount = candidates.length - 1;

        if (candidateCount > 0) {
            for (let i = 1; i <= length; i++) {
                const loc = Math.round(Math.random() * candidateCount);
                result += arrCandidates[loc];
            }
        }

        return result;
    },
    randomAlphaNumeric(length = 0) {
        const candidates = '0123456789ABCEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        return this.random(candidates, length);
    }
}