import axios from '../../config/http.js';
import {
  Platform,
} from 'react-native';

export default {
  async login() {
    try {
      await axios.get('http://web.bagazhu.com/api/user/info', {
        params: {
          os: Platform.OS,
        },
      });
    } catch (error) {
    }
  },
};
