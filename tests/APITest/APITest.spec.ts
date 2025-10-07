import { test, expect } from '@playwright/test';

const REPO = 'Playwright_Freerange';
const USER =  'andrestesterqa';

test('API Test - Create an issuein a repository', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] Issue created by Playwright',
            body: 'This is the description of the issue',}
    });
    expect(newIssue.status()).toBe(201);

    const issue = await request.get(`/repos/${USER}/${REPO}/issues`).then(res => res.json());
    expect(issue.ok()).toBeTruthy();
    expect(issue.title).toBe('[Bug] Issue created by Playwright');
    expect(issue.body).toBe('This is the description of the issue');
});