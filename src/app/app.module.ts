import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LogicModule } from './logic/logic.module';
import { SharedModule } from './shared/shared.module';
import { PublicModule } from './modules/public/public.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppConfigService } from './core/services/app-config.service';
import { AdminModule } from './modules/admin/admin.module';

export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    SharedModule,
    PublicModule,
    AdminModule,
    LogicModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}

/*
Web.config (IIS):
---------------------------------------------
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.web>
    <sessionState timeout="1440" />
  </system.web>
  <system.webServer>
    <rewrite>
	  <rules>
		<rule name="Web Api" stopProcessing="true">
		  <match url="^api/.*" />
		  <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
		  <action type="None" />
		</rule>
		<rule name="Angular Routes" stopProcessing="true">
		  <match url=".*" />
		  <conditions logicalGrouping="MatchAll">
			<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
			<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
		  </conditions>
		  <action type="Rewrite" url="/webapp/" />
		</rule>
	  </rules>
	</rewrite>
  </system.webServer>
</configuration>
*/
