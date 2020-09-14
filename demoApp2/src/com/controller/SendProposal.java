package com.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.jdbc.SendProposalJDBC;

/**
 * Servlet implementation class SendProposal
 */
@WebServlet("/SendProposal")
public class SendProposal extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SendProposal() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{	
		HttpSession session = request.getSession();
		String username = (String) session.getAttribute("username_sup");
		String quote = request.getParameter("quote");
		String req_id = request.getParameter("req_id");
		int status = SendProposalJDBC.sendData(req_id,username,quote);
		if(status == 1)
			response.getWriter().println("Success");
			
		else
			response.getWriter().println("Fail");
		
	}

}
