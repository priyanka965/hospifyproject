import { test as base } from "@playwright/test";
import LogoutPAge from "../POM pages/LogoutPAge";
import LoginPage from "../POM pages/LoginPage";
import DoctorPage from "../POM pages/DoctorPage";
import ReceptionPage from "../POM pages/ReceptionPage";
import QueuePage from "../POM pages/QueuePage";
import NursePage from "../POM pages/NursePage";



export const test = base.extend({

    lgnpage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dctrpage: async ({ page }, use) => {
        await use(new DoctorPage(page));
    },

    receptnpage: async ({ page }, use) => {
        await use(new ReceptionPage(page));
    },

    quepg: async ({ page }, use) => {
        await use(new QueuePage(page));
    },

    nursepage: async ({ page }, use) => {
        await use(new NursePage(page));
    },
     lgoutpage: async ({ page }, use) => {
        await use(new LogoutPAge(page));
    }


});
