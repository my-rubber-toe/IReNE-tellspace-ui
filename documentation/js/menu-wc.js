'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ire-ne-tell-space documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-db471d58baec652f7b0dd7ec6b5d7a1f"' : 'data-target="#xs-components-links-module-AppModule-db471d58baec652f7b0dd7ec6b5d7a1f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-db471d58baec652f7b0dd7ec6b5d7a1f"' :
                                            'id="xs-components-links-module-AppModule-db471d58baec652f7b0dd7ec6b5d7a1f"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-2d8d999978614a34589906507655a882"' : 'data-target="#xs-components-links-module-CoreModule-2d8d999978614a34589906507655a882"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-2d8d999978614a34589906507655a882"' :
                                            'id="xs-components-links-module-CoreModule-2d8d999978614a34589906507655a882"' }>
                                            <li class="link">
                                                <a href="components/CoreComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CoreComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InvalidUrlComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InvalidUrlComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DocumentEditionModule.html" data-type="entity-link">DocumentEditionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DocumentEditionModule-a5ed61df58935e262d65a634af0c589f"' : 'data-target="#xs-components-links-module-DocumentEditionModule-a5ed61df58935e262d65a634af0c589f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DocumentEditionModule-a5ed61df58935e262d65a634af0c589f"' :
                                            'id="xs-components-links-module-DocumentEditionModule-a5ed61df58935e262d65a634af0c589f"' }>
                                            <li class="link">
                                                <a href="components/ActorsEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActorsEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuthorsEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthorsEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DateTimelineEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DateTimelineEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DescriptionEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DescriptionEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocSidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DocSidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocumentEditionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DocumentEditionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocumentOptionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DocumentOptionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LocationsEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LocationsEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SectionEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SectionEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TagsCategoriesEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TagsCategoriesEditorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DocumentEditionRoutingModule.html" data-type="entity-link">DocumentEditionRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DocumentsDashboardModule.html" data-type="entity-link">DocumentsDashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DocumentsDashboardModule-b488ade8482ce3d28688ac4370598f41"' : 'data-target="#xs-components-links-module-DocumentsDashboardModule-b488ade8482ce3d28688ac4370598f41"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DocumentsDashboardModule-b488ade8482ce3d28688ac4370598f41"' :
                                            'id="xs-components-links-module-DocumentsDashboardModule-b488ade8482ce3d28688ac4370598f41"' }>
                                            <li class="link">
                                                <a href="components/DocTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DocTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocumentsDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DocumentsDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewDocumentDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewDocumentDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DocumentsDashboardRoutingModule.html" data-type="entity-link">DocumentsDashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link">LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-f4f897d4cb5a3d2c8be8eb43fc89412b"' : 'data-target="#xs-components-links-module-LoginModule-f4f897d4cb5a3d2c8be8eb43fc89412b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-f4f897d4cb5a3d2c8be8eb43fc89412b"' :
                                            'id="xs-components-links-module-LoginModule-f4f897d4cb5a3d2c8be8eb43fc89412b"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link">LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link">ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfileModule-adb5503adcba1ff44c014e90e6c11211"' : 'data-target="#xs-components-links-module-ProfileModule-adb5503adcba1ff44c014e90e6c11211"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-adb5503adcba1ff44c014e90e6c11211"' :
                                            'id="xs-components-links-module-ProfileModule-adb5503adcba1ff44c014e90e6c11211"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileRoutingModule.html" data-type="entity-link">ProfileRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/InvalidUrlComponent.html" data-type="entity-link">InvalidUrlComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseDocument.html" data-type="entity-link">CaseDocument</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContentSection.html" data-type="entity-link">ContentSection</a>
                            </li>
                            <li class="link">
                                <a href="classes/DirtyStateErrorMatcher.html" data-type="entity-link">DirtyStateErrorMatcher</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DocumentEditionService.html" data-type="entity-link">DocumentEditionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DocumentsService.html" data-type="entity-link">DocumentsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link">AuthInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/FakeBackendInterceptor.html" data-type="entity-link">FakeBackendInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CaseDocumentResolverService.html" data-type="entity-link">CaseDocumentResolverService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Actor.html" data-type="entity-link">Actor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Author.html" data-type="entity-link">Author</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CaseDocumentCreateRequest.html" data-type="entity-link">CaseDocumentCreateRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Category.html" data-type="entity-link">Category</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Profile.html" data-type="entity-link">Profile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Timeline.html" data-type="entity-link">Timeline</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tokens.html" data-type="entity-link">Tokens</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});