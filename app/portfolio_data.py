from flask import g
import sqlite3, hashlib, binascii, os

class PortfolioData:


  def __init__(self):
    self.DATABASE = 'help_me.db'
    
    # self._create_tables()


  def _get_db(self):
    db = g.get('_database', None)
    if db is None:
        db = g._database = sqlite3.connect(self.DATABASE)
    return db


  def close_connection(self):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
