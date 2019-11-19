<%@ page import="servlets.Coordinate" %>
<%@ page import="java.util.Vector" %>
<%--
  Created by IntelliJ IDEA.
  User: Amirjon
  Date: 29.10.2019
  Time: 21:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8"  language="java" %>
<html>

<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        name="viewport">
  <meta content="ie=edge" http-equiv="X-UA-Compatible">
  <link href="img/favicon.ico" rel="shortcut icon" type="image/x-icon">
  <link href="styles/style.css" rel="stylesheet">
  <link href="styles/table.css" rel="stylesheet">
  <script src="js/jquery.js" type="text/javascript"></script>
  <script src="js/script.js" type="text/javascript"></script>
  <script src="js/graph.js" type="text/javascript"></script>
  <title>Web №2</title>
</head>

<body style="background-image: url('img/1.jpg')">
<div class="wrapper">
  <header>
    <span class="student-info">Кадыров Амирджон, Мансуров Бехруз  P3210</span>
    <span class="group-info"></span>
    <span class="variant-info">Вариант 19387</span>
  </header>
  <div class="content" id="content">
    <div class="img-form">

      <form class="data-send-form" id="form" oninput="onYInpChange()">
        <div class="form-input">

          <div class="form-input-x"><label for="x-value-select"><strong>X: </strong></label>
            <input id="x-value-select" maxlength="15" name="x_value" placeholder="-4 ... 4" type="text" value=""/>
          </div>

          <div class="form-input-y"><label for="y-value-select"><strong>Y: </strong></label>
            <input id="y-value-select" maxlength="15" name="y_value" placeholder="-5 ... 5" type="text" value=""/>
          </div>

          <div class="radio-buttons centered" id="r_value_select">
            <p><strong>R: </strong></p><br>
            <p><label class="radio-label" for="radio-button-2">2</label>
              <input class="radio-input" id="radio-button-2" name="r_value" type="radio" value="2">
            </p>
            <p><label class="radio-label" for="radio-button-2.5">2.5</label>
              <input class="radio-input" id="radio-button-2.5" name="r_value" type="radio" value="2.5">
            </p>
            <p><label class="radio-label" for="radio-button-3">3</label>
              <input class="radio-input" id="radio-button-3" name="r_value" type="radio" value="3">
            </p>
            <p><label class="radio-label" for="radio-button-3.5">3.5</label>
              <input class="radio-input" id="radio-button-3.5" name="r_value" type="radio" value="3.5">
            </p>
            <p><label class="radio-label" for="radio-button-4">4</label>
              <input class="radio-input" id="radio-button-4" name="r_value" type="radio" value="4">
            </p><br>
            <p><label class="radio-label" for="radio-button-4.5">4.5</label>
              <input class="radio-input" id="radio-button-4.5" name="r_value" type="radio" value="4.5">
            </p><br>
            <p><label class="radio-label" for="radio-button-5">5</label>
              <input class="radio-input" id="radio-button-5" name="r_value" type="radio" value="5">
            </p>
          </div>

          <div class="form-buttons">
            <button class="check-button" id="submitButton" type="submit">Проверить</button>
            <button class="clear-button" id="clearButton" type="button">Очистить</button>
          </div>
          <div id="error-log"></div>
        </div>
      </form>
      <div class="areas-img centered">
        <canvas id="plot" width="300" height="300">
        </canvas>
      </div>
    </div>
    <div class="table-wrapper" style="overflow-x: auto;">
      <div class="table">
        <div class="table-header" style="overflow-x: auto">

          <div class="header__item"><a class="filter__link" id="x-table">X</a></div>
          <div class="header__item"><a class="filter__link" id="y-table">Y</a></div>
          <div class="header__item"><a class="filter__link" id="r-table">R</a></div>
          <div class="header__item"><a class="filter__link" id="result-table">Результат</a></div>
          <div class="header__item"><a class="filter__link" id="time-table">Текущее время</a></div>
          <div class="header__item"><a class="filter__link" id="cr-time-table">Время выполнения запроса</a>
          </div>
        </div>
        <div class="table-content" id="ans">
          <% Object attribute = request.getSession().getAttribute("userData");

            if (!(attribute == null || ((Vector<Coordinate>) attribute).size() == 0)) {
              Vector<Coordinate> coordinates = (Vector<Coordinate>) attribute;
              for (Coordinate element : coordinates) {%>
          <div class="table-row">
            <div class="table-data table-data_X"><%= element.getX() %>
            </div>
            <div class="table-data table-data_Y"><%= element.getY() %>
            </div>
            <div class="table-data table-data_R"><%= element.getR() %>
            </div>
            <div class="table-data"><% out.println(element.getCorrectWords()); %></div>
            <div class="table-data"><%= element.getRequestTime() %>
            </div>
            <div class="table-data"><%= element.getExecutionTime() %>
            </div>
          </div>
          <%
              }
            }
          %>
        </div>
      </div>
    </div>
  </div>
  <footer class="centered">
    <span class="student-info-footer"><a href="https://github.com/AmirjonQodirov" title="GitHub">@AmirjonQodirov</a></span>
    <span class="student-footer-icon"><img alt="Ссылка на GitHub" src="img/GitHubIcon.png"></span>
    <span class="prepod">Преподаватель: Александр Яркеев</span>
  </footer>
</div>
</body>

<script type="text/javascript">
  $(document).ready(drawGraph());
</script>

</html>
