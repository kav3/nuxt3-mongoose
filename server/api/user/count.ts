import { countUser } from '../../services/user.service'

export default async (req, res) => (await countUser()).toString();