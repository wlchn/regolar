$(function() {
  function doTest() {
    $.post("/do_test/", {
      regexp: $("#regexp").val(),
      testString: $("#test-string").val(),
      findAll: $("#find-all").is(":checked")
    }).done(function(res) {
      handleRes(res);
    }).error(function(error) {
      handleError(error);
    });
  }

  function handleRes(res) {
    res = $.parseJSON(res);
    var allMatches = res.matches;
    var groupsName = res.groupsName;

    clearResults();
    if (allMatches && allMatches[0] != null) {
      renderMatchs(allMatches, groupsName);
    } else {
      $("#match-result").html("No match !")
      $("#match-result").css("color", "red")
    }
  }

  function handleError(error) {
    $("#match-result").html(error.responseText)
    $("#match-result").css("color", "red")
  }

  function renderMatchs(allMatches, groupsName) {
    var matchResult = [];
    var matchGroupsTable = [];
    var index = 0;
    for (var i = 0; i < allMatches.length; i++) {
      var matches = allMatches[i];
      matchResult.push(matches[0]);
      for (var j = 1; j < matches.length; j++) {
        matchGroupsTable.push('<tr><td>'+(++index)+'</td><td>'+((groupsName[j-1] != "") ? groupsName[j-1] : "-")+'</td><td>'+escapeHTML(matches[j])+'</td></tr>');
      }
    }

    $("#match-result").css("color", "green");
    $("#match-result").html(escapeHTML(matchResult.join(" ")))
    $('#match-groups > tbody:last').append(matchGroupsTable.join());
  }

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  function clear() {
    $("#regexp").val("");
    $("#test-string").val("");
    clearResults();
  }

  function clearResults() {
    $("#match-groups tbody > tr").remove();
    $("#match-result").html("")
  }

  $("#regexp").bind('input', function() {
    doTest();
  })

  $("#test-string").bind('input', function() {
    doTest();
  })

  $("#find-all").click(function() {
    doTest();
  })

  $("#clear").click(function() {
    clear();
  });

  doTest();

});
