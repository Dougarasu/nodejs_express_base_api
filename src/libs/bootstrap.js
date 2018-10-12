import crypto from "crypto";
import { preferenceModel } from '../components/preferences/preferences.model';
import { userModel } from '../components/users/users.model';

import userSeeder from '../components/users/users.seeder';
import preferencesSeeder from "../components/preferences/preferences.seeder";

export default {

  async init(config) {
    try {
      // Seed the database
      const performMigration = await preferenceModel.findOne({ key: 'perform_migration' });

      if (!performMigration) {
        console.log('Planting seeds...');

        // get password hashes for all the default users
        userSeeder.forEach(userData => {
          userData.accessData.password = crypto
            .createHmac("sha256", config.key)
            .update(userData.accessData.password)
            .digest("hex");
        });

        try {
          await Promise.all([
            preferenceModel.insertMany(preferencesSeeder),
            userModel.insertMany(userSeeder),
          ]);
          console.log('Seeds planted!');
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      } else {
        console.log('Seeds are growing.');
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
