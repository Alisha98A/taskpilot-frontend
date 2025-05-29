import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Form,
  Button,
  Dropdown,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const OPTIONS = {
  PRIORITIES: [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ],
  STATES: [
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In Progress" },
    { value: "done", label: "Done" },
    { value: "overdue", label: "Overdue" },
  ],
  CATEGORIES: [
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "fitness", label: "Fitness" },
    { value: "finance", label: "Finance" },
    { value: "misc", label: "Miscellaneous" },
  ],
};

const formatDateForInput = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

const getMinDate = () => {
  const d = new Date();
  return d.toISOString().slice(0, 10);
};