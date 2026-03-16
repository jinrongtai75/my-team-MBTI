import { renderHome } from './views/home.js';
import { renderTest } from './views/test.js';
import { renderResult } from './views/result.js';
import { renderTeamReport } from './views/teamReport.js';

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navBtns = document.querySelectorAll('.nav-btn');

    // Simple router
    const routes = {
        home: renderHome,
        test: renderTest,
        result: renderResult,
        teamReport: renderTeamReport
    };

    // Keep global state to pass between views if needed
    let appState = {};

    function navigate(viewName, state = {}) {
        const viewFunction = routes[viewName];
        if (viewFunction) {
            // merge state
            appState = { ...appState, ...state };
            
            // clear content and render new view
            mainContent.innerHTML = '';
            viewFunction(mainContent, navigate, appState);

            // Update nav active states
            navBtns.forEach(btn => {
                if (btn.dataset.view === viewName) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            // scroll to top
            window.scrollTo(0, 0);
        }
    }

    // Bind nav clicks
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const viewName = e.currentTarget.dataset.view;
            navigate(viewName);
        });
    });

    // Initial render
    navigate('home');
});
