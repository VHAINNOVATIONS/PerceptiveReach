/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

describe('main test', function () {
  var $compile, $rootScope;

  beforeEach(module('ui.widgets'));
  beforeEach(module('ngTable'));
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.myData = [];
    $rootScope.widgetData = [1,[["VeteranLast, VeteranFirst M","000020688","8005550784","2004-01-07T00:00:00.00Z","High","<select class='form-control'><option value=''></option><option value=1>Not Contacted</option><option value=2>Outreach Initiated</option><option value=3>Outreach Attempted - No Response</option><option value=4>Services Refused</option><option value=5>No Additional Outreach Required</option></select>"]]];
  }));

  it('should have topN directive', function() {
    var element = angular.element('<div wt-top-n data="myData"></div>');
    $compile(element)($rootScope);
    $rootScope.$digest();
    expect(element.hasClass('top-n')).toBe(true);
  });

  it('should have veteran roster table directive', function() {
    var element = angular.element('<div wt-veteran-roster-table data="widgetData"></div>');
    $compile(element)($rootScope);
    $rootScope.$digest();
    expect(element.children().hasClass('dataTables_wrapper')).toBe(true);
  });

  it('should have medication directive', function() {
    var element = angular.element('<div wt-medication data="widgetData"></div>');
    $compile(element)($rootScope);
    $rootScope.$digest();
    expect(element.children().hasClass('ng-table')).toBe(true);
  });
});

