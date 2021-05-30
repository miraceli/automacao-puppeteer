require('dotenv').config();
const puppeteer = require('puppeteer');

async function acessarSite(){
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    // Acessando a página do Unsplash
    console.log('Acessando o site Unsplash.');
    await page.goto('https://unsplash.com/', {
        waitUntil: 'load',
        timeout: 0
    });

    // Fazendo o login
    console.log('Veja o login acontecer!');
    await page.click('[href="/login"]');
    await page.type('[name="user[email]"]', process.env.EMAIL);
    await page.type('#user_password', process.env.SENHA);
    await page.click('[type="submit"]');

    await page.waitForNavigation();

    // Pesquisando imagens
    console.log('Pesquisando imagens com o termo beach.');
    await page.type('[type="search"]', process.env.SEARCH);
    await page.click('[title="Search Unsplash"]');

    // Dando like em uma photo
    console.log('Acessando uma imagem para dar like.');
    await page.goto('https://unsplash.com/photos/RN6ts8IZ4_0', {
        waitUntil: 'load',
        timeout: 0
    });
    await page.click('[title="Like photo"]');
    console.log('Printando a tela');
    await page.screenshot({ path: 'like.png' });

    console.log('Fechando o navegador.')
    await browser.close();
}

acessarSite();