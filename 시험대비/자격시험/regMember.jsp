<%@page import="java.sql.ResultSet"%> <%@page import="java.sql.Statement"%> <%@page import="DBPKG.DBcon"%> <%@page
import="java.sql.Connection"%> <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="header.jsp" %> <% Connection con = DBcon.getConnction(); String sql = "SELECT max(custno)+1 FROM
member_tbl_02"; Statement stmt = con.createStatement(); ResultSet rs = stmt.executeQuery(sql); rs.next(); %>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Insert title here</title>
    </head>
    <body>
        <h1>홈쇼핑 회원 등록</h1>
        <form name="frm" action="Regist" method="post">
            <table border="1">
                <tr>
                    <th>회원번호(자동발생)</th>
                    <td><input type="text" name="custno" value="<%=rs.getInt(1) %>" /></td>
                </tr>
                <tr>
                    <th>회원성명</th>
                    <td><input type="text" name="custname" /></td>
                </tr>
                <tr>
                    <th>회원전화</th>
                    <td><input type="text" name="phone" /></td>
                </tr>
                <tr>
                    <th>회원주소</th>
                    <td><input type="text" name="address" /></td>
                </tr>
                <tr>
                    <th>가입일자</th>
                    <td><input type="text" name="joindate" /></td>
                </tr>
                <tr>
                    <th>고객등급(A:VIP,B:일반,C:직원)</th>
                    <td><input type="text" name="grade" /></td>
                </tr>
                <tr>
                    <th>도시코드</th>
                    <td><input type="text" name="city" /></td>
                </tr>
                <tr>
                    <th colspan="2">
                        <input type="submit" value="등록" onclick="return inputCheck()" />
                        <input type="button" value="조회" onclick="return moveList()" />
                    </th>
                </tr>
            </table>
        </form>
    </body>
    <script>
        function inputCheck() {
            if (document.frm.custname.value.length == 0) {
                alert('회원성명이 입력되지 않았습니다.');
                document.frm.custname.focus();
                return false;
            }
            if (document.frm.phone.value.length == 0) {
                alert('회원전화가 입력되지 않았습니다.');
                document.frm.phone.focus();
                return false;
            }
            if (document.frm.address.value.length == 0) {
                alert('회원주소가 입력되지 않았습니다.');
                document.frm.address.focus();
                return false;
            }
            if (document.frm.joindate.value.length == 0) {
                alert('가입일자가 입력되지 않았습니다.');
                document.frm.joindate.focus();
                return false;
            }
            if (document.frm.grade.value.length == 0) {
                alert('고객등급이 입력되지 않았습니다.');
                document.frm.grade.focus();
                return false;
            }
            if (document.frm.city.value.length == 0) {
                alert('도시코드가 입력되지 않았습니다.');
                document.frm.city.focus();
                return false;
            }
            alert('회원등록이 완료되었습니다!!');
            return true;
        }

        function moveList() {
            location.href = 'memberList.jsp';
        }
    </script>
</html>
