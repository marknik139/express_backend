import OpenAI from 'openai';
import User from '../models/User.js';

class QueryController {
    async generateQuery(req, res) {
        const _id = req.user.id;
        const { query } = req.body;
        try {
            if (!query) {
                return res.status(400).json({ message: 'Query is not provided' });
            }

            const user = await User.findOne({_id});
            const apiKey = user.key;
            if (!apiKey) {
                return res.status(400).json({ message: 'Key is not provided' });
            }
            const openai = new OpenAI();
            openai.apiKey = apiKey;

            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: query },
                ],
            });

            res.json({ message: completion.choices[0].message.content });
        } catch (e) {
            console.error(e);
            res.status(400).json({ message: 'Generate query error' });
        }
    }
}

export default new QueryController();
